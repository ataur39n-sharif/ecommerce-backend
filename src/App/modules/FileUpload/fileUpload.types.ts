export interface IGeneratedUrlPayload {
    url: string;
    fieldName: string;
    fileName: string;
}

export interface IGroupedGeneratedUrlPayload {
    fieldName: string;
    files: {
        fileName: string;
        url: string;
    }[];
}