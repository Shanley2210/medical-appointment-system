import { ConfigProvider } from 'antd';
import React, { useEffect, useState } from 'react';

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
    isDark: false,
    toggleTheme: () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark';
    });

    useEffect(() => {
        const html = document.querySelector('html');
        if (isDark) {
            html?.classList.add('dark');
        } else {
            html?.classList.remove('dark');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    function toggleTheme() {
        setIsDark((prev) => !prev);
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            <ConfigProvider
                theme={{
                    components: {
                        Layout: {
                            headerBg: isDark ? '#111827' : '#FFFFFF',
                            siderBg: isDark ? '#111827' : '#FFFFFF',
                            bodyBg: isDark ? '#1F2937' : '#F8F9FA'
                        },
                        Menu: {
                            colorBgContainer: isDark ? '#111827' : '#FFFFFF',
                            itemBg: isDark ? '#111827' : '#FFFFFF',
                            itemColor: isDark ? '#F3F4F6' : '#1A1A1A',
                            itemHoverColor: isDark ? '#F3F4F6' : '#000000',
                            itemBorderRadius: 0
                        },
                        Dropdown: {
                            colorBgElevated: isDark ? '#1F2937' : '#F8F9FA',
                            colorText: isDark ? '#F3F4F6' : '#1A1A1A',
                            controlItemBgHover: isDark ? '#374151' : '#F5F5F5'
                        },
                        Avatar: {
                            colorText: isDark ? '#F3F4F6' : '#1A1A1A'
                        },
                        Button: {
                            colorBgContainer: isDark ? '#374151' : '#1677FF',
                            colorText: isDark ? '#F3F4F6' : '#F3F4F6',
                            colorBorder: isDark ? '#3B82F6' : '#0D6EFD',
                            borderRadius: 0
                        },
                        Input: {
                            colorBgContainer: isDark ? '#374151' : '',
                            colorText: isDark ? '#F3F4F6' : '',
                            colorBorder: isDark ? '#3B82F6' : '#E1E1E1',
                            colorBgElevated: isDark ? '#1F2937' : '#FFFFFF',
                            borderRadius: 0
                        },
                        Select: {
                            colorBgContainer: isDark ? '#374151' : '',
                            colorText: isDark ? '#F3F4F6' : '',
                            colorBorder: isDark ? '#3B82F6' : '#E1E1E1',
                            colorBgElevated: isDark ? '#1F2937' : '#FFFFFF',
                            optionSelectedBg: isDark ? '#374151' : '#F3F4F6',
                            borderRadius: 0
                        },
                        Table: {
                            colorBgContainer: isDark ? '#374151' : '#FFFFFF',
                            colorText: isDark ? '#F3F4F6' : '#1A1A1A',
                            colorTextHeading: isDark ? '#F3F4F6' : '#000000',
                            borderColor: isDark ? '#3B82F6' : '#0D6EFD'
                        },
                        Pagination: {
                            colorBgContainer: isDark ? '#1F2937' : '#FFFFFF'
                        },
                        Modal: {
                            colorBgElevated: isDark ? '#1F2937' : '#FFFFFF',
                            colorTextHeading: isDark ? '#F3F4F6' : '#000000',
                            colorBorder: isDark ? '#3B82F6' : '#0D6EFD'
                        },
                        Upload: {
                            borderRadius: 0
                        }
                    }
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
}
