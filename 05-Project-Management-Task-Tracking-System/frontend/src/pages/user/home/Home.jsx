import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-primary/10">
            <div className="text-center space-y-8 px-4 max-w-3xl">
                <div className="flex justify-center mb-6">
                    <div className="avatar placeholder">
                        <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-2xl w-24 shadow-2xl">
                            <span className="text-5xl font-bold">PM</span>
                        </div>
                    </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                    Project Management & Task Tracking System
                </h1>
                <p className="text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
                    Streamline your workflow with our comprehensive project management solution. 
                    Manage projects, track tasks, and coordinate with your team members efficiently.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Link to="/admin" className="btn btn-primary btn-lg gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        Go to Dashboard
                    </Link>
                </div>
                
                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-base-300">
                    <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300">
                        <div className="card-body items-center text-center">
                            <div className="avatar placeholder mb-2">
                                <div className="bg-primary/10 text-primary rounded-xl w-16">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="card-title text-lg">Projects</h3>
                            <p className="text-base-content/60 text-sm">Organize and manage all your projects in one place</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300">
                        <div className="card-body items-center text-center">
                            <div className="avatar placeholder mb-2">
                                <div className="bg-secondary/10 text-secondary rounded-xl w-16">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 11l3 3L22 4" />
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="card-title text-lg">Tasks</h3>
                            <p className="text-base-content/60 text-sm">Track tasks with status updates and assignments</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300">
                        <div className="card-body items-center text-center">
                            <div className="avatar placeholder mb-2">
                                <div className="bg-accent/10 text-accent rounded-xl w-16">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="card-title text-lg">Team</h3>
                            <p className="text-base-content/60 text-sm">Collaborate effectively with your team members</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
