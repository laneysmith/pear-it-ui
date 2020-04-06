export type PearEntity = {
    id: string;
    name: string;
    basket: string | null;
};

export type BasketEntity = {
    id: string;
    name: string;
    teamId: string;
};