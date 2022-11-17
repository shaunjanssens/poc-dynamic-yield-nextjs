export default function RootLayout({children}) {
    return (
        <html lang="en" className="[color-scheme:dark]">
        <head/>
        <body>
        {children}
        </body>
        </html>
    );
}

