import { DefaultConfig } from 'ngx-easy-table';

export default function(){
  // eslint-disable-next-line prefer-const
  let configuracao  = { ...DefaultConfig }

  configuracao.columnReorder = false;
  configuracao.fixedColumnWidth = false;
  configuracao.resizeColumn = true;
  configuracao.detailsTemplate = true;
  configuracao.tableLayout.borderless = true;
  configuracao.rows = 5;
  configuracao.paginationRangeEnabled = false;
  configuracao.paginationEnabled = false;

  return configuracao
}





