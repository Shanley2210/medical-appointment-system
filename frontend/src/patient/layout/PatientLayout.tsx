import PatientHeader from '../components/PatientHeader';

export default function PatientLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex min-h-screen flex-col bg-background select-none'>
            <PatientHeader />
            <main className='flex-1 container py-6 md:py-8'>{children}</main>
        </div>
    );
}
