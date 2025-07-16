// import { BrasilApiCep } from './nodes/BrasilApiCep/BrasilApiCep.node';
// export const nodeTypes = [BrasilApiCep];


import { Cep } from './nodes/Cep.node';
import { Ddd } from './nodes/Ddd.node';
import { Cnpj } from './nodes/Cnpj.node';
import { Fipe } from './nodes/Fipe.node';
import { Feriados } from './nodes/Feriados.node';
import { CepV2 } from './nodes/CepV2.node';

export const nodeTypes = [Cep, CepV2, Ddd, Cnpj, Fipe, Feriados];
