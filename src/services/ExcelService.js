import { utils, writeFileXLSX } from 'xlsx';

export default class ExcelService {
    static makeExcelFile(fileName, headers, data) {
        const content = [headers, ...data];
        const workbook = utils.book_new();
        const worksheet = utils.aoa_to_sheet(content);
        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        writeFileXLSX(workbook, `${fileName}.xlsx`);
    }
}
