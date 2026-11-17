// Design systém Caravanixu: tokeny, komponenty, ikony.
// Styl se importuje zvlášť: `import "@caravanix/ui/styles.css"` (písmo, tokeny, základ, komponenty).
// Komponenty nemají žádný text natvrdo; všechny texty přicházejí jako props ze souborů jazyka.
export * from "./tokens.ts";
export * from "./number.ts";
export * from "./theme.ts";
export * from "./icons.tsx";
export { Button, type ButtonProps } from "./components/Button.tsx";
export { NumberField, type NumberFieldProps } from "./components/NumberField.tsx";
export { SegmentedControl, type SegmentedControlProps, type SegmentOption } from "./components/SegmentedControl.tsx";
export { Slider, type SliderProps, type SliderMark } from "./components/Slider.tsx";
export { Notice, STATUS_ICON, type NoticeProps, type Status } from "./components/Notice.tsx";
export { ResultCard, type ResultCardProps, type ResultValue } from "./components/ResultCard.tsx";
export { DataTable, type DataTableProps, type DataColumn } from "./components/DataTable.tsx";
export { SiteHeader, ThemeToggle, type SiteHeaderProps, type ThemeToggleProps, type NavItem } from "./components/SiteHeader.tsx";
export { SiteFooter, type SiteFooterProps } from "./components/SiteFooter.tsx";
export { ShareCard, type ShareCardProps } from "./components/ShareCard.tsx";
export { ExamplePicker, type ExamplePickerProps, type ExampleItem } from "./components/ExamplePicker.tsx";
export { TankGauge, type TankGaugeProps } from "./components/TankGauge.tsx";
export { BarList, type BarListProps, type BarRow, type BarTone } from "./components/BarList.tsx";
