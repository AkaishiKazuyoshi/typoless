export interface raidBossObject {
    id: number,
    name: string|null,
    maxHP: number,
    image_name: string,
    is_beated: boolean,
    damage: number,
}

export interface damageLogObject {
    name: string | null,
    damage: number,
    boss_id: number,
}
 
