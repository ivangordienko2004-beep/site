import { Container } from "@/components/Container";

export function AppFooter() {
  return (
    <footer className="border-t border-muted/20 mt-10">
      <Container className="py-6 text-sm flex items-center justify-between">
        <span>© {new Date().getFullYear()} A. Frantseva</span>
        <span className="text-muted">Built with React & Tailwind</span>
      </Container>
    </footer>
  );
}
