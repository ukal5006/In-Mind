import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import { Search } from 'lucide-react';
import debounce from 'lodash/debounce';
import axios from 'axios';
import '../../../theme/class.css';
import { useOrganization } from './OrganizationContext';
import userStore from '../../../stores/userStore';
import './CounselingOrganizationModal.css';

const apiUrl = 'https://i11b301.p.ssafy.io/api';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

interface Organization {
    id: number;
    name: string;
}

const CounselingOrganizationModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<'search' | 'add' | 'freelance'>('search');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [newOrg, setNewOrg] = useState({ name: '', addr: '', tel: '' });
    const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([]);
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
    const { setOrganization } = useOrganization();
    const { token } = userStore();

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const filterOrganizations = (orgs: Organization[], term: string) => {
        const filtered = orgs.filter((org) => org.name.toLowerCase().includes(term.toLowerCase()));
        setFilteredOrganizations(filtered);
    };

    const handleOrgClick = (org: Organization) => {
        setSelectedOrg(org);
    };

    const selectOrganization = () => {
        if (selectedOrg) {
            setOrganization(selectedOrg.name, selectedOrg.id);
            closeModal();
        }
    };

    const searchOrganizations = async () => {
        try {
            const response = await axios.get(apiUrl + '/orgs', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                params: { query: searchTerm },
            });
            setOrganizations(response.data);
            filterOrganizations(response.data, searchTerm);
        } catch (error) {
            console.error('Error searching organizations:', error);
            setOrganizations([]);
            setFilteredOrganizations([]);
        }
    };

    const debouncedSearch = useCallback(
        debounce((term: string) => {
            if (term) {
                searchOrganizations();
            } else {
                filterOrganizations(organizations, term);
            }
        }, 300),
        [organizations]
    );

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTerm = e.target.value;
        setSearchTerm(newTerm);
        filterOrganizations(organizations, newTerm);
    };

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    const addOrganization = async () => {
        try {
            const response = await axios.post(`${apiUrl}/orgs`, newOrg, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            });
            alert('상담기관이 추가되었습니다.');
            setOrganization(response.data.name, response.data.id);
            setNewOrg({ name: '', addr: '', tel: '' });
            setActiveTab('search');
        } catch (error) {
            console.error('Error adding organization:', error);
            alert('상담기관 추가에 실패하였습니다.');
        }
    };

    const selectFreelance = () => {
        setOrganization('프리랜서', 0);
        closeModal();
    };

    return (
        <>
            <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
                상담기관 선택
            </button>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="tab-buttons mb-4">
                    <button
                        className={activeTab === 'search' ? 'active' : ''}
                        onClick={() => setActiveTab('search')}
                    >
                        상담기관 검색
                    </button>
                    <button
                        className={activeTab === 'add' ? 'active' : ''}
                        onClick={() => setActiveTab('add')}
                    >
                        상담기관 추가
                    </button>
                    <button
                        className={activeTab === 'freelance' ? 'active' : ''}
                        onClick={() => setActiveTab('freelance')}
                    >
                        프리랜서 선택
                    </button>
                </div>

                {activeTab === 'search' && (
                    <div>
                        <div className="flex mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                                className="border p-2 flex-grow"
                                placeholder="상담기관 검색..."
                            />
                            <button onClick={searchOrganizations} className="bg-blue-500 text-white p-2 ml-2">
                                <Search size={20} />
                            </button>
                        </div>
                        <div className="content h-64 overflow-y-auto">
                            {filteredOrganizations.map((org) => (
                                <div
                                    key={org.id}
                                    className={`p-2 border-b cursor-pointer ${
                                        selectedOrg?.id === org.id ? 'bg-blue-100' : ''
                                    }`}
                                    onClick={() => handleOrgClick(org)}
                                >
                                    {org.name}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={selectOrganization}
                            className="primary-button mt-4"
                            disabled={!selectedOrg}
                        >
                            상담기관 선택하기
                        </button>
                    </div>
                )}

                {activeTab === 'add' && (
                    <div>
                        <input
                            type="text"
                            value={newOrg.name}
                            onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                            className="border p-2 mb-2 w-full"
                            placeholder="상담기관 이름"
                        />
                        <input
                            type="text"
                            value={newOrg.addr}
                            onChange={(e) => setNewOrg({ ...newOrg, addr: e.target.value })}
                            className="border p-2 mb-2 w-full"
                            placeholder="주소"
                        />
                        <input
                            type="text"
                            value={newOrg.tel}
                            onChange={(e) => setNewOrg({ ...newOrg, tel: e.target.value })}
                            className="border p-2 mb-2 w-full"
                            placeholder="전화번호"
                        />
                        <button onClick={addOrganization} className="primary-button">
                            상담기관 추가
                        </button>
                    </div>
                )}

                {activeTab === 'freelance' && (
                    <div>
                        <p>프리랜서로 선택하시겠습니까?</p>
                        <button onClick={selectFreelance} className="secondary-button mt-4">
                            프리랜서 선택
                        </button>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default CounselingOrganizationModal;
