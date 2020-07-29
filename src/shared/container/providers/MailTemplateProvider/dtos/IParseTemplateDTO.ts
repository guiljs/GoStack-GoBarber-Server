interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseTenplateDTO {
  template: string;
  variables: ITemplateVariables;
}
