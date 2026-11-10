import { Button } from '@repo/ui';

export default function LoginPage() {
  return (
    <div className="mx-auto mt-20 max-w-md rounded-lg border border-border p-6">
      <h1 className="mb-4 text-xl font-bold">ورود</h1>
      <form className="flex flex-col gap-3">
        <label className="text-sm">
          ایمیل
          <input className="mt-1 w-full rounded border border-input px-3 py-2" type="email" dir="ltr" />
        </label>
        <label className="text-sm">
          رمز عبور
          <input className="mt-1 w-full rounded border border-input px-3 py-2" type="password" dir="ltr" />
        </label>
        <Button type="submit">ورود</Button>
      </form>
    </div>
  );
}
