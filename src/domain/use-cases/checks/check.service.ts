interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (info: { url: string; status: number; time: number }) => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
        private readonly timeoutMs: number = 3000 // ⏱ tiempo máximo
    ) {}

    public async execute(url: string): Promise<boolean> {
        const start = Date.now(); // ⏱ inicio medición

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

        try {
            const res = await fetch(url, { signal: controller.signal });
            clearTimeout(timeout);

            const time = Date.now() - start;

            if (!res.ok) {
                throw new Error(`Status ${res.status}`);
            }

            // ✅ callback con info útil
            this.successCallback({
                url,
                status: res.status,
                time
            });

            return true;
        } catch (error) {
            clearTimeout(timeout);

            const message =
                error instanceof Error ? error.message : 'Unknown error';

            this.errorCallback(`${url} - ${message}`);
            return false;
        }
    }
}