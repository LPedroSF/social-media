export const updateUserTheme = async (userId, newTheme) => {
  const res = await fetch(`http://localhost:4000/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ theme: newTheme }),
  });

  if (!res.ok) {
    throw new Error('Failed to update theme');
  }

  return res.json();
};