export interface Planet {
    id?: string, // problem with spring backend -> planetId
    name: string,
    size: number,
    distance: number,
    ordinality: number,
    description: string 
}