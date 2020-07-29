import IParseTenplateDTO from '../dtos/IParseTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseTenplateDTO): Promise<string>;
}
