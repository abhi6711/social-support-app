/**
 * Submit application data to the backend API with simulated delay
 */
export async function submitApplication(data: unknown): Promise<{ ok: true }>{
  // mock delay
  await new Promise((r) => setTimeout(r, 800));
  console.log('Submitted application', data);
  return { ok: true };
}




