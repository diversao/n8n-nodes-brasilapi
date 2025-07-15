import { IExecuteFunctions } from 'n8n-workflow';
import type { NodeConnectionType } from 'n8n-workflow';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class Fipe implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'BrasilAPI FIPE',
    name: 'brasilApiFipe',
    group: ['transform'],
    version: 1,
    description: 'Consulta FIPE usando BrasilAPI (veículos, marcas, preços)',
    icon: 'file:icon.svg',
    defaults: {
      name: 'FIPE',
    },
    inputs: ['main' as NodeConnectionType],
    outputs: ['main' as NodeConnectionType],
    properties: [
      {
        displayName: 'Tipo de consulta',
        name: 'tipo',
        type: 'options',
        options: [
          { name: 'Marcas', value: 'marcas' },
          { name: 'Modelos', value: 'modelos' },
          { name: 'Anos', value: 'anos' },
          { name: 'Preço', value: 'preco' }
        ],
        default: 'marcas',
        description: 'Escolha o tipo de consulta na FIPE'
      },
      {
        displayName: 'Tipo de veículo',
        name: 'veiculo',
        type: 'options',
        options: [
          { name: 'Carro', value: 'carros' },
          { name: 'Moto', value: 'motos' },
          { name: 'Caminhão', value: 'caminhoes' }
        ],
        default: 'carros',
        description: 'Categoria de veículo'
      },
      {
        displayName: 'Código da Marca',
        name: 'codigoMarca',
        type: 'string',
        default: '',
        required: false
      },
      {
        displayName: 'Código do Modelo',
        name: 'codigoModelo',
        type: 'string',
        default: '',
        required: false
      },
      {
        displayName: 'Ano Modelo',
        name: 'anoModelo',
        type: 'string',
        default: '',
        required: false
      }
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const tipo = this.getNodeParameter('tipo', i) as string;
      const veiculo = this.getNodeParameter('veiculo', i) as string;
      const codigoMarca = this.getNodeParameter('codigoMarca', i) as string;
      const codigoModelo = this.getNodeParameter('codigoModelo', i) as string;
      const anoModelo = this.getNodeParameter('anoModelo', i) as string;

      let url = '';
      if (tipo === 'marcas') {
        url = `https://brasilapi.com.br/api/fipe/marcas/v1/${veiculo}`;
      } else if (tipo === 'modelos') {
        url = `https://brasilapi.com.br/api/fipe/modelos/v1/${veiculo}/${codigoMarca}`;
      } else if (tipo === 'anos') {
        url = `https://brasilapi.com.br/api/fipe/anos/v1/${veiculo}/${codigoMarca}/${codigoModelo}`;
      } else if (tipo === 'preco') {
        url = `https://brasilapi.com.br/api/fipe/preco/v1/${veiculo}/${codigoMarca}/${codigoModelo}/${anoModelo}`;
      }

      try {
        const response = await this.helpers.httpRequest({
          method: 'GET',
          url,
          json: true,
        });
        returnData.push({ json: response });
      } catch (error) {
        returnData.push({
          json: { error: (error as Error).message, tipo, veiculo, codigoMarca, codigoModelo, anoModelo },
        });
      }
    }

    return [returnData];
  }
}
export default Fipe;
