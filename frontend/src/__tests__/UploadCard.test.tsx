/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import UploadCard from '../components/UploadCard'
import { describe, expect, it } from 'vitest';
describe('UploadCard Component', () => {
    it('renders the main heading', () => {
        // @ts-ignore
        render(<UploadCard />);
        // @ts-ignore
        expect(screen.getByRole('heading', { name: /upload file/i })).toBeInTheDocument();
    });
    it('renders the upload file button', () => {
        // @ts-ignore
        render(<UploadCard />);
        // @ts-ignore
        expect(screen.getByRole('button', { name: /upload file/i })).toBeInTheDocument();
    });
    it('renders the choose file button', () => {
        // @ts-ignore
        render(<UploadCard />);
        // @ts-ignore
        expect(screen.getByRole('button', { name: /choose file/i })).toBeInTheDocument();
    });
});
