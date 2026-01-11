import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import { Op } from 'sequelize';
import fs from 'fs/promises';
import path from 'path';
import * as productQueries from '#queries/product';

handlebars.registerHelper('formatCurrency', (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
});

const PUPPETEER_BROWSER = await puppeteer.launch({
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage'
  ]
});

const generateHtml = async (products) => {
  const templatePath = path.resolve('./src/templates/catalog.hbs');
  const templateHtml = await fs.readFile(templatePath, 'utf-8');
  const compileTemplate = handlebars.compile(templateHtml);
  const finalHtml = compileTemplate({
    products
  }, {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  });

  return finalHtml;
}

const convertHtmlToPdf = async (html) => {
  const page = await PUPPETEER_BROWSER.newPage();

  try {
    await page.setContent(html, { waitUntil: 'load' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
    });

    return pdfBuffer;
  } finally {
    await page.close();
  }
};

export const generateCatalogPdf = async () => {
  const products = await productQueries.findAllActiveProducts({
    quantity: {
      [Op.gt]: 0
    }
  });

  const catalogHtml = await generateHtml(products);
  const catalogPdf = await convertHtmlToPdf(catalogHtml);

  return catalogPdf;
};
