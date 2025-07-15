import { IExecuteFunctions } from 'n8n-workflow';
import type { NodeConnectionType } from 'n8n-workflow';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class Cnpj implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'BrasilAPI CNPJ',
    name: 'brasilApiCnpj',
    group: ['transform'],
    version: 1,
    description: 'Consulta CNPJ usando BrasilAPI',
    icon: 'file:logo.svg',
    defaults: {
      name: 'CNPJ',
    },
    inputs: ['main' as NodeConnectionType],
    outputs: ['main' as NodeConnectionType],
    properties: [
      {
        displayName: 'CNPJ',
        name: 'cnpj',
        type: 'string',
        default: '',
        placeholder: '00000000000191',
        required: true,
        description: 'CNPJ a ser consultado',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    for (let i = 0; i < items.length; i++) {
      const cnpj = this.getNodeParameter('cnpj', i) as string;
      try {
        const response = await this.helpers.httpRequest({
          method: 'GET',
          url: `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`,
          json: true,
        });
        returnData.push({ json: response });
      } catch (error) {
        returnData.push({
          json: { error: (error as Error).message, cnpj },
        });
      }
    }
    return [returnData];
  }
}
export default Cnpj;
