import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProcider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
