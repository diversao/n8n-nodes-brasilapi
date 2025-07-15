import { IExecuteFunctions } from 'n8n-workflow';
import type { NodeConnectionType } from 'n8n-workflow';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class Feriados implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'BrasilAPI Feriados',
    name: 'brasilApiFeriados',
    group: ['transform'],
    version: 1,
    description: 'Consulta feriados nacionais para um ano via BrasilAPI',
    icon: 'file:logo.svg',
    defaults: {
      name: 'Feriados',
    },
    inputs: ['main' as NodeConnectionType],
    outputs: ['main' as NodeConnectionType],
    properties: [
      {
        displayName: 'Ano',
        name: 'ano',
        type: 'string',
        default: new Date().getFullYear().toString(),
        placeholder: '2025',
        required: true,
        description: 'Ano para consulta dos feriados nacionais'
      }
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    for (let i = 0; i < items.length; i++) {
      const ano = this.getNodeParameter('ano', i) as string;
      try {
        const response = await this.helpers.httpRequest({
          method: 'GET',
          url: `https://brasilapi.com.br/api/feriados/v1/${ano}`,
          json: true,
        });
        // A resposta é um array de feriados, um por item!
        if (Array.isArray(response)) {
          for (const feriado of response) {
            returnData.push({ json: feriado });
          }
        } else {
          returnData.push({ json: response });
        }
      } catch (error) {
        returnData.push({
          json: { error: (error as Error).message, ano },
        });
      }
    }
    return [returnData];
  }
}
export default Feriados;
