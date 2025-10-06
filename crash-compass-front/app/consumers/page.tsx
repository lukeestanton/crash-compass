import { notFound } from 'next/navigation';

export default function ConsumersPage() {
	// Route intentionally removed — delegate to category routing.
	// Return a 404 so callers use the category route instead.
	notFound();
}
