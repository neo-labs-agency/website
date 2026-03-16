const SUBMIT_URL = "https://inputhaven.com/api/v1/submit";

export type SubmitContactPayload = {
  name: string;
  email: string;
  message: string;
  _form_id?: string;
};

export async function submitContactForm(
  _key: string,
  { arg }: { arg: SubmitContactPayload }
): Promise<void> {
  const res = await fetch(SUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
}
