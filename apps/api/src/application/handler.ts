/** CQRS-lite: کنترلر فقط HTTP است؛ جهش و خواندن از این لایه می‌گذرد. */
export type CommandHandler<TInput, TOutput> = (input: TInput) => Promise<TOutput>;
export type QueryHandler<TInput, TOutput> = (input: TInput) => Promise<TOutput>;
