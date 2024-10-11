export function validateBookTitle(title: string): boolean {
  return title.trim() !== '';
}

export function validateBookAuthor(author: string): boolean {
  return author.trim() !== '';
}

export function validateBookYear(year: string): boolean {
  const yearNumber = parseInt(year);
  return (
    !isNaN(yearNumber) &&
    yearNumber > 0 &&
    yearNumber <= new Date().getFullYear()
  );
}

export function validateUserName(name: string): boolean {
  return name.trim() !== '';
}

export function validateUserEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function showErrorMessage(elementId: string, message: string) {
  const errorElement = document.getElementById(elementId) as HTMLInputElement;
  if (errorElement) {
    console.log((errorElement.textContent = message));
  }
}

export function clearErrorMessage(elementId: string) {
  const errorElement = document.getElementById(elementId) as HTMLInputElement;
  if (errorElement) {
    console.log((errorElement.textContent = ''));
    console.log('clear is fine');
  }
}
