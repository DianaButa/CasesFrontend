export interface ParteDTO {
    nume: string;
    calitateParte: string;
}

export interface SedintaDTO {
    complet: string;
    data: Date;
    ora: string;
    solutie: string;
    solutieSumar: string;
    dataPronuntare?: Date;
    documentSedinta: string;
    numarDocument: string;
    dataDocument?: Date;
}

export interface CaleAtacDTO {
    dataDeclarare: Date;
    parteDeclaratoare: string;
    tipCaleAtac: string;
}

export interface FileDetailsDTO {
    numar: string;
    numarVechi: string;
    data: Date;
    institutie: string;
    departament: string;
    categorieCaz: string;
    stadiuProcesual: string;
    parti: ParteDTO[];
    sedinte: SedintaDTO[];
    caiAtac: CaleAtacDTO[];
}

export interface MyFile {
    id: number;
    fileNumber: string;
    details: FileDetailsDTO;
}
