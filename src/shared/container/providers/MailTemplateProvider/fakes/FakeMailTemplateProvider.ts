import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseTenplateDTO from '../dtos/IParseTemplateDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseTenplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
