export interface IFlex {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  row?: string;
}

// Row
// Props
// reverse (Boolean): Use flex-direction: row-reverse. Default: false
// start
// center
// end
// top
// middle
// bottom
// around
// between
// first
// last (String(xs|sm|md|lg): Align elements to the start or end of row as well as the top, bottom, or center of a column.
// 
// Col
// Props
// reverse (Boolean): Use flex-direction: column-reverse. Default: false
// xs
// sm
// md
// lg (Boolean|Integer):
// When true, enable auto sizing column.
// When false, hide colomn for the breakpoint.
// When interger value, it specify the column size on the grid. (1 to 12)
// xsOffset
// smOffset
// mdOffset
// lgOffset (Integer): Offset the column.
