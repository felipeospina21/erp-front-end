export interface IsAuth {
  isAuth: boolean;
}

export async function checkAuth(): Promise<IsAuth | Record<string, never>> {
  if (process.env.NODE_ENV === 'test') return {};

  if (typeof window !== 'undefined') {
    const isAuth = sessionStorage.getItem('isAuth');
    if (isAuth) {
      return { isAuth: true };
    } else {
      return { isAuth: false };
    }
  }
  return {};
}
