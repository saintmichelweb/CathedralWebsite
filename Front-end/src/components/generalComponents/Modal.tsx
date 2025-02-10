import React from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Donate Now</h2>
                <p className="mb-4">
                    Thank you for considering a donation. Your generosity helps our parish continue its mission and support the community. Here are different ways you can contribute:
                </p>
                <ul className="mb-4 list-disc list-inside">
                    <li><strong>Offertory:</strong> Support the parish's daily operations, including utilities, maintenance, and staff salaries.</li>
                    <li><strong>Tithe:</strong> A traditional 10% offering of your income to support the church's ministries and outreach programs.</li>
                    <li><strong>Charity:</strong> Donations specifically directed towards helping those in need, including food drives, housing assistance, and emergency relief.</li>
                    <li><strong>Special Donations:</strong> Contributions for specific causes such as building renovations, new projects, or support for a particular event.</li>
                    <li><strong>Memorial Donations:</strong> Give in memory of a loved one to honor their legacy and support the church.</li>
                    <li><strong>Mass Intentions:</strong> Offer a donation for a specific Mass to be said in honor of a particular intention or person.</li>
                </ul>
                <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default Modal
