import React, { useState } from 'react'
import { Link, Outlet, useLocation } from "react-router"

const Dashboard = () => {
    const location = useLocation()
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }
    
    const isActive = (path) => {
        if (path === '/admin/stats') {
            return location.pathname === '/admin/stats' || location.pathname === '/admin'
        }
        return location.pathname.startsWith(path)
    }

    const navItems = [
        {
            path: '/admin/stats',
            label: 'Dashboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            )
        },
        {
            path: '/admin/projects',
            label: 'Projects',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
            )
        },
        {
            path: '/admin/tasks',
            label: 'Tasks',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
            )
        },
        {
            path: '/admin/team-members',
            label: 'Team Members',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            )
        },
        {
            path: '/admin/users',
            label: 'Users',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            )
        }
    ]

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-base-100">
                {/* Simple Navbar */}
                <nav className="navbar w-full bg-base-100 border-b border-base-300 shadow-sm px-4 lg:px-6">
                    <div className="flex items-center gap-2">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                        <button 
                            onClick={toggleSidebar}
                            className="btn btn-square btn-ghost hidden lg:flex hover:bg-base-200"
                            aria-label="toggle sidebar"
                            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold">Project Management System</h2>
                    </div>
                </nav>
                
                {/* Page content */}
                <div className="flex-1 overflow-y-auto bg-gradient-to-br from-base-100 via-base-100 to-base-200/50">
                    <div className="p-6 lg:p-8">
                        <Outlet />
                    </div>
                </div>
            </div>

            <div className="drawer-side z-40">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <aside className={`min-h-full bg-base-200 border-r border-base-300 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
                    {/* Navigation Menu */}
                    <nav className={`transition-all duration-300 pt-4 ${sidebarCollapsed ? 'p-2' : 'p-4'}`}>
                        <ul className="menu menu-vertical gap-2">
                            {navItems.map((item) => {
                                const active = isActive(item.path)
                                return (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className={`
                                                ${sidebarCollapsed ? 'tooltip tooltip-right' : ''}
                                                flex items-center
                                                ${sidebarCollapsed ? 'justify-center px-0' : 'gap-3'}
                                                ${active 
                                                    ? 'bg-primary text-primary-content font-semibold' 
                                                    : 'hover:bg-base-300'
                                                }
                                            `}
                                            data-tip={sidebarCollapsed ? item.label : undefined}
                                        >
                                            <span className={sidebarCollapsed ? 'flex' : 'w-5'}>{item.icon}</span>
                                            {!sidebarCollapsed && <span>{item.label}</span>}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </aside>
            </div>
        </div>
    )
}

export default Dashboard
