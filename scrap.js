const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore/lite');
const puppeteer = require('puppeteer');
const fs = require('fs');
const { parse } = require('json2csv');

// const firebaseConfig = {
//   apiKey: "AIzaSyBSLvtOwLYJ45f4-AwacbZp9PfHoYpfYcU",
//   authDomain: "internspot-app-project.firebaseapp.com",
//   projectId: "internspot-app-project",
//   storageBucket: "internspot-app-project.appspot.com",
//   messagingSenderId: "964331089168",
//   appId: "1:964331089168:web:5b64ff3f0eb719c24f0995",
//   measurementId: "G-PZ02B7H27R"
// };

// Clone project Config
const firebaseConfig = {
  apiKey: "AIzaSyB8D2h-2l_2VYPBc2pukhKDqvZ4I_Av7Aw",
  authDomain: "internspot-clone.firebaseapp.com",
  projectId: "internspot-clone",
  storageBucket: "internspot-clone.appspot.com",
  messagingSenderId: "733300522093",
  appId: "1:733300522093:web:5fea8a04523f5e7ea41364",
  measurementId: "G-GH3SK8YN61"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function scrapeWebsite(baseUrl, startDate, endDate) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });


        let allJobs = [];
        for (let currentPage = 1; currentPage <= 2; currentPage++) {
            const url = `${baseUrl}&pge=${currentPage}`;
            await page.goto(url, { waitUntil: 'domcontentloaded' });

            // Attendre que le contenu se charge
            await page.waitForSelector('a[title]', { timeout: 5000 }); // Attente de 5 secondes pour le sélecteur

      // Extraire les liens href relatifs pour chaque offre
      const hrefs = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[title]'));
        const validHrefs = links
          .map(link => link.getAttribute('href'))
          .filter(href => href.startsWith('categorie/309/Offres-emploi/annonce/'));
        return validHrefs.map(href => `https://www.marocannonces.com/${href}`);
      });

      allJobs = allJobs.concat(hrefs);
    }

    // Récupérer les détails pour chaque offre d'emploi
    const jobDetails = [];
    for (const jobUrl of allJobs) {
      const jobPage = await browser.newPage();
      try {
        await jobPage.goto(jobUrl, { waitUntil: 'domcontentloaded' });

        // Extraire la date de publication de l'offre d'emploi
        const publishedDateText = await jobPage.evaluate(() => document.querySelector('.info-holder li:nth-child(2)').textContent.trim());

        // Extraire la date et l'heure de publication à partir de la chaîne de texte
        const dateRegex = /Publiée le:\s*(\d+\s+\w+)-(\d+:\d+)/;
        const dateMatch = publishedDateText.match(dateRegex);
        if (dateMatch) {
          const date = dateMatch[1]; // '25 Mar'
          const time = dateMatch[2]; // '9:34'

          // Vérifier si la date est dans la plage de dates spécifiée
          const currentDate = new Date(`${date} ${new Date().getFullYear()} ${time}`);
          if (currentDate >= startDate && currentDate <= endDate) {
            // Extraire les autres détails de l'offre d'emploi
            const title = await jobPage.evaluate(() => document.querySelector('h1').textContent.trim());
            const location = await jobPage.evaluate(() => document.querySelector('.info-holder li:nth-child(1) a').textContent.trim());
            const views = await jobPage.evaluate(() => document.querySelector('.info-holder li:nth-child(3)').textContent.trim());
            const description = await jobPage.evaluate(() => {
                const blocks = Array.from(document.querySelectorAll('.block'));
                const descriptionBlock = blocks.find(block => block.querySelector('.box1'));
                if (descriptionBlock) {
                    const isBox1 = child => child.className === 'box1';
                    const descriptionLines = Array.from(descriptionBlock.childNodes)
                        .filter(node => !isBox1(node)) // Exclude elements with class 'box1'
                        .map(node => node.textContent.trim())
                        .filter(line => line !== '');
                    return descriptionLines.join('\n');
                } else {
                    return '';
                }
            });
            

            const otherDetails = await jobPage.evaluate(() => {
              const detailsElement = document.querySelector('#extraQuestionName');
              if (detailsElement) {
                const detailItems = Array.from(detailsElement.querySelectorAll('li'));
                const detailsObj = {};
                detailItems.forEach(item => {
                  const key = item.textContent.split(':')[0].trim();
                  const value = item.textContent.split(':')[1].trim();
                  detailsObj[key] = value;
                });
                return detailsObj;
              } else {
                return null;
              }
            });

            jobDetails.push({
              title,
              location,
              publishedDate: `${date} ${time}`,
              views,
              description,
              ...otherDetails
            });
          }
        }

      } catch (error) {
        console.error(`Error occurred while scraping job page ${jobUrl}:`, error);
      } finally {
        await jobPage.close();
      }
    }

// Convertir les détails des offres en format CSV
if (jobDetails.length > 0) {
    // Trier les offres d'emploi par date de publication (du plus ancien au plus récent)
    jobDetails.sort((a, b) => {
      const dateA = new Date(a.publishedDate);
      const dateB = new Date(b.publishedDate);
      return dateB - dateA; // Tri décroissant pour obtenir les dates les plus récentes en premier
    });
  
    const csv = parse(jobDetails);
  
    // Enregistrer les données dans un fichier CSV
    fs.writeFileSync('job_details2.csv', csv, 'utf-8');
    console.log('Les détails des offres d\'emploi ont été enregistrés dans job_details2.csv.');

    // Save data to Firebase
    jobDetails.forEach(data => {
        db.collection('offers').add(data)
            .then(() => console.log('Document successfully written to Firebase'))
            .catch(error => console.error('Error writing document:', error));
    });
  } else {
    console.log('Aucun détail d\'offre d\'emploi publiée dans la plage de dates spécifiée n\'a été trouvé.');
  }

  

  } catch (error) {
    console.error('Une erreur s\'est produite:', error);
  } finally {
    await browser.close();
  }
}


// Utilisation de la fonction avec l'URL de base et les dates de début et de fin de la plage de dates
const baseUrl = 'https://www.marocannonces.com/maroc/offres-emploi-domaine-informatique-multimedia-internet-b309.html?f_3=Informatique+%2F+Multim%C3%A9dia+%2F+Internet';
// const baseUrl = 'https://www.marocannonces.com/maroc/offres-emploi-domaine-informatique-multimedia-internet-b309.html?kw=stage&f_3=Informatique+%2F+Multim%C3%A9dia+%2F+Internet';
const startDate = new Date('2024-03-28'); // Date de début de la plage de dates spécifiée
const endDate = new Date(); // Date de fin de la plage de dates spécifiée (aujourd'hui)



console.log("Scraping website...");
scrapeWebsite(baseUrl, startDate, endDate);
console.log("Scraping website completed.");