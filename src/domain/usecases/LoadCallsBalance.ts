export interface LoadCallsBalance {
  load: () => Promise<LoadCallsBalance.Model>;
}

export namespace LoadCallsBalance {
  export type Model = {
    dados: {
      saldo: number;
    };
    mensagem: string;
  };
}
