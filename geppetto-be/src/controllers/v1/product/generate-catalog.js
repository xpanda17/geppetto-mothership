import * as generateCatalogService from '#services/product/catalog/generate';
import asyncHandler from '#utils/async-handler';

export const generateCatalog = asyncHandler(async (req, res) => {
  const pdfBuffer = await generateCatalogService.generateCatalogPdf();

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=catalog.pdf',
    'Content-Length': pdfBuffer.length,
  });

  return res.end(pdfBuffer);
});
