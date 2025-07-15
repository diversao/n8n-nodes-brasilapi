import { IExecuteFunctions } from 'n8n-workflow';
import type { NodeConnectionType } from 'n8n-workflow';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class Ddd implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'BrasilAPI DDD',
    name: 'brasilApiDdd',
    group: ['transform'],
    version: 1,
    description: 'Consulta DDD usando BrasilAPI',
    icon: 'file:logo.svg',
    defaults: {
      name: 'DDD',
    },
    inputs: ['main' as NodeConnectionType],
    outputs: ['main' as NodeConnectionType],
    properties: [
      {
        displayName: 'DDD',
        name: 'ddd',
        type: 'string',
        default: '',
        placeholder: '62',
        required: true,
        description: 'DDD a ser consultado',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    for (let i = 0; i < items.length; i++) {
      const ddd = this.getNodeParameter('ddd', i) as string;
      try {
        const response = await this.helpers.httpRequest({
          method: 'GET',
          url: `https://brasilapi.com.br/api/ddd/v1/${ddd}`,
          json: true,
        });
        returnData.push({ json: response });
      } catch (error) {
        returnData.push({
          json: { error: (error as Error).message, ddd },
        });
      }
    }
    return [returnData];
  }
}
export default Ddd;
