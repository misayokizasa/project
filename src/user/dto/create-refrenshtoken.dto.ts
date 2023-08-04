export class CreateRefrenshtokenDto  {
    id: number;
    created: Date;
    updated: Date;
    active: boolean;
    active_sum: number;
    refresh_token: string;
    ttl: Date;
    user_id: number;
}
