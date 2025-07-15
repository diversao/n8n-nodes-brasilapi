import { IExecuteFunctions } from 'n8n-workflow';
import type { NodeConnectionType } from 'n8n-workflow';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class BrasilApiCep implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'BrasilAPI CEP',
    name: 'brasilApiCep',
    group: ['transform'],
    version: 1,
    description: 'Consulta CEP usando BrasilAPI',
    icon: 'file:icon.svg',
    defaults: {
      name: 'BrasilAPI CEP',
    },
    inputs: ['main' as NodeConnectionType],
    outputs: ['main' as NodeConnectionType],
    properties: [
      {
        displayName: 'CEP',
        name: 'cep',
        type: 'string',
        default: '',
        placeholder: '74310110',
        required: true,
        description: 'CEP a ser consultado',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    for (let i = 0; i < items.length; i++) {
      const cep = this.getNodeParameter('cep', i) as string;
      try {
        const response = await this.helpers.httpRequest({
          method: 'GET',
          url: `https://brasilapi.com.br/api/cep/v1/${cep}`,
          json: true,
        });
        returnData.push({ json: response });
      } catch (error) {
        returnData.push({
          json: { error: (error as Error).message, cep },
        });
      }
    }
    return [returnData];
  }
}


export default BrasilApiCep;