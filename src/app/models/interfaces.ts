export interface IEmailPwd {
    email: string;
    password: string;
}

export interface IVacanca {
    id?: number;
    nom: string;
    preu: number;
    pais: string;
    descripcio: string;
    user: string;
}

export interface IUser {
    id?: string;
    nom: string;
    cognom: string;
    email: string;
    tokenPush: string;
    avatar: IUserAvatar;
}

export interface IUserAvatar {
    storagePath: string;
    storageBase64: string;
}

export interface IUserPhoto {
    filepath: string;
    webviewPath?: string;
}
