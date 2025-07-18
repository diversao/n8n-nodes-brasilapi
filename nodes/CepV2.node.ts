import { IExecuteFunctions } from 'n8n-workflow';
import type { NodeConnectionType } from 'n8n-workflow';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class CepV2 implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'BrasilAPI CEP v2',
    name: 'brasilApiCepV2',
    group: ['transform'],
    version: 1,
    description: 'Consulta CEP usando a BrasilAPI (v2)',
    icon: 'file:logo.svg',
    defaults: {
      name: 'CEP v2',
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
          url: `https://brasilapi.com.br/api/cep/v2/${cep}`,
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
export default CepV2;
