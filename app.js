const { useState, useEffect } = React;

// Lucide icons as inline SVG components
const Icons = {
  Users: () => <svg className="inline" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Trophy: () => <svg className="inline" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
  Flame: () => <svg className="inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  Target: () => <svg className="inline" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Clock: () => <svg className="inline" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Plus: () => <svg className="inline" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  CheckCircle: () => <svg className="inline" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  XCircle: () => <svg className="inline" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  AlertCircle: () => <svg className="inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Link2: () => <svg className="inline" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  Trash2: () => <svg className="inline" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>,
  Award: () => <svg className="inline" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  TrendingUp: () => <svg className="inline" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Calendar: () => <svg className="inline" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  ChevronDown: () => <svg className="inline" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  ChevronUp: () => <svg className="inline" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
};

// Mock storage API
window.storage = {
  async get(key) {
    const data = localStorage.getItem(key);
    return data ? { value: data } : null;
  },
  async set(key, value) {
    localStorage.setItem(key, value);
    return { key, value };
  }
};

const DSATracker = () => {
  const [members, setMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [challenges, setChallenges] = useState([]);
  const [view, setView] = useState('dashboard');
  const [newProblem, setNewProblem] = useState({ title: '', link: '', difficulty: 'Medium' });
  const [problemsList, setProblemsList] = useState([]);
  const [expandedChallenge, setExpandedChallenge] = useState(null);
  const [historyView, setHistoryView] = useState('all');
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const membersData = await window.storage.get('dsa-members');
      const challengesData = await window.storage.get('dsa-challenges');
      
      if (membersData) {
        setMembers(JSON.parse(membersData.value));
      } else {
        const defaultMembers = [
          { id: 1, name: 'Member 1', totalPaid: 0, totalEarned: 0, streak: 0, maxStreak: 0, totalSubmissions: 0 },
          { id: 2, name: 'Member 2', totalPaid: 0, totalEarned: 0, streak: 0, maxStreak: 0, totalSubmissions: 0 },
          { id: 3, name: 'Member 3', totalPaid: 0, totalEarned: 0, streak: 0, maxStreak: 0, totalSubmissions: 0 }
        ];
        setMembers(defaultMembers);
        await window.storage.set('dsa-members', JSON.stringify(defaultMembers));
      }
      
      if (challengesData) {
        setChallenges(JSON.parse(challengesData.value));
      }
    } catch (error) {
      const defaultMembers = [
        { id: 1, name: 'Member 1', totalPaid: 0, totalEarned: 0, streak: 0, maxStreak: 0, totalSubmissions: 0 },
        { id: 2, name: 'Member 2', totalPaid: 0, totalEarned: 0, streak: 0, maxStreak: 0, totalSubmissions: 0 },
        { id: 3, name: 'Member 3', totalPaid: 0, totalEarned: 0, streak: 0, maxStreak: 0, totalSubmissions: 0 }
      ];
      setMembers(defaultMembers);
    }
  };

  const saveData = async (newMembers, newChallenges) => {
    try {
      await window.storage.set('dsa-members', JSON.stringify(newMembers || members));
      await window.storage.set('dsa-challenges', JSON.stringify(newChallenges || challenges));
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const addMember = async () => {
    if (!newMemberName.trim()) {
      alert('Please enter a member name');
      return;
    }

    const newMember = {
      id: Date.now(),
      name: newMemberName.trim(),
      totalPaid: 0,
      totalEarned: 0,
      streak: 0,
      maxStreak: 0,
      totalSubmissions: 0
    };

    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    await saveData(updatedMembers, challenges);
    setNewMemberName('');
    setShowAddMember(false);
    alert(`${newMemberName} added successfully!`);
  };

  const removeMember = async (memberId) => {
    const member = members.find(m => m.id === memberId);
    const memberChallenges = challenges.filter(c => c.memberId === memberId);
    
    if (memberChallenges.length > 0) {
      if (!confirm(`${member.name} has ${memberChallenges.length} challenge(s). Are you sure you want to remove them?`)) {
        return;
      }
    }

    const updatedMembers = members.filter(m => m.id !== memberId);
    const updatedChallenges = challenges.filter(c => c.memberId !== memberId);
    
    setMembers(updatedMembers);
    setChallenges(updatedChallenges);
    await saveData(updatedMembers, updatedChallenges);
    alert(`${member.name} removed successfully!`);
  };

  const addProblems = () => {
    if (!currentUser || problemsList.length !== 6) {
      alert('Please select a member and add exactly 6 problems');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newChallenge = {
      id: Date.now(),
      memberId: parseInt(currentUser),
      memberName: members.find(m => m.id === parseInt(currentUser))?.name,
      problems: problemsList,
      submittedDate: today,
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      status: 'pending',
      solutionsSubmitted: false
    };

    const updatedMembers = members.map(m => {
      if (m.id === parseInt(currentUser)) {
        return { ...m, totalSubmissions: m.totalSubmissions + 1 };
      }
      return m;
    });

    const updated = [...challenges, newChallenge];
    setChallenges(updated);
    setMembers(updatedMembers);
    saveData(updatedMembers, updated);
    setProblemsList([]);
    setNewProblem({ title: '', link: '', difficulty: 'Medium' });
    alert('Problems submitted successfully!');
  };

  const addProblemToList = () => {
    if (!newProblem.title.trim()) {
      alert('Please enter a problem title');
      return;
    }
    if (problemsList.length >= 6) {
      alert('Maximum 6 problems allowed');
      return;
    }

    setProblemsList([...problemsList, { ...newProblem, solved: false }]);
    setNewProblem({ title: '', link: '', difficulty: 'Medium' });
  };

  const removeProblem = (index) => {
    setProblemsList(problemsList.filter((_, i) => i !== index));
  };

  const submitSolutions = (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    const allSolved = challenge.problems.every(p => p.solved);

    if (!allSolved) {
      alert('Please mark all problems as solved before submitting');
      return;
    }

    const updated = challenges.map(c => {
      if (c.id === challengeId) {
        return { ...c, solutionsSubmitted: true, status: 'completed', completedDate: new Date().toISOString().split('T')[0] };
      }
      return c;
    });

    const updatedMembers = members.map(m => {
      if (m.id === challenge.memberId) {
        const newStreak = m.streak + 1;
        return { 
          ...m, 
          streak: newStreak,
          maxStreak: Math.max(m.maxStreak, newStreak)
        };
      }
      return m;
    });

    setChallenges(updated);
    setMembers(updatedMembers);
    saveData(updatedMembers, updated);
    alert('Solutions submitted successfully! 🎉');
  };

  const markAsFailed = (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    
    const updatedMembers = members.map(m => {
      if (m.id === challenge.memberId) {
        return { ...m, totalPaid: m.totalPaid + 100, streak: 0 };
      } else {
        return { ...m, totalEarned: m.totalEarned + 50 };
      }
    });

    const updated = challenges.map(c => {
      if (c.id === challengeId) {
        return { ...c, status: 'failed', failedDate: new Date().toISOString().split('T')[0] };
      }
      return c;
    });

    setChallenges(updated);
    setMembers(updatedMembers);
    saveData(updatedMembers, updated);
  };

  const toggleProblemSolved = (challengeId, problemIndex) => {
    const updated = challenges.map(c => {
      if (c.id === challengeId) {
        const newProblems = [...c.problems];
        newProblems[problemIndex] = { ...newProblems[problemIndex], solved: !newProblems[problemIndex].solved };
        return { ...c, problems: newProblems };
      }
      return c;
    });
    setChallenges(updated);
    saveData(members, updated);
  };

  const getMemberChallenges = (memberId, status = 'all') => {
    return challenges.filter(c => {
      if (status === 'all') return c.memberId === memberId;
      return c.memberId === memberId && c.status === status;
    });
  };

  // Memoize the dashboard to prevent unnecessary re-renders
  const DashboardView = React.useMemo(() => {
    const sortedMembers = [...members].sort((a, b) => b.streak - a.streak);
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Icons.Users /> Team Members ({members.length})
            </h3>
            <button
              onClick={() => setShowAddMember(!showAddMember)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              <Icons.Plus /> Add Member
            </button>
          </div>

          {showAddMember && (
            <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600 mb-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter member name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addMember()}
                  className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <button onClick={addMember} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-semibold transition-all">
                  Add
                </button>
                <button onClick={() => { setShowAddMember(false); setNewMemberName(''); }} className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-semibold transition-all">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sortedMembers.map((member, index) => (
            <div key={member.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 relative">
              <button onClick={() => removeMember(member.id)} className="absolute top-3 right-3 text-gray-500 hover:text-red-400 transition-colors" title="Remove member">
                <Icons.XCircle />
              </button>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {index === 0 && member.streak > 0 && (
                    <div className="bg-yellow-500 rounded-full p-2">
                      <Icons.Trophy />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                </div>
                <div className="flex items-center gap-1 bg-orange-500 rounded-full px-3 py-1">
                  <Icons.Flame />
                  <span className="text-white font-bold">{member.streak}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Max Streak</span>
                  <span className="font-semibold text-orange-400">{member.maxStreak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Submissions</span>
                  <span className="font-semibold text-blue-400">{member.totalSubmissions}</span>
                </div>
                <div className="h-px bg-gray-700"></div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Paid</span>
                  <span className="font-semibold text-red-400">₹{member.totalPaid}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Earned</span>
                  <span className="font-semibold text-green-400">₹{member.totalEarned}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                  <span className="text-gray-300 font-medium">Net Balance</span>
                  <span className={`font-bold ${member.totalEarned - member.totalPaid >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ₹{member.totalEarned - member.totalPaid}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
            <Icons.Target /> Active Challenges
          </h3>
          {challenges.filter(c => c.status === 'pending').length === 0 ? (
            <div className="text-center py-12">
              <Icons.AlertCircle />
              <p className="text-gray-400 text-lg mt-4">No active challenges. Submit problems to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {challenges.filter(c => c.status === 'pending').map(challenge => {
                const solvedCount = challenge.problems.filter(p => p.solved).length;
                const progress = (solvedCount / 6) * 100;
                
                return (
                  <div key={challenge.id} className="border border-gray-700 rounded-xl p-5 bg-gray-800/50 hover:bg-gray-800 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-xl text-white mb-1">{challenge.memberName}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Icons.Clock /> Due: {challenge.dueDate}
                          </span>
                          <span>Submitted: {challenge.submittedDate}</span>
                        </div>
                      </div>
                      <span className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                        <Icons.AlertCircle /> Pending
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white font-semibold">{solvedCount}/6 solved</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {challenge.problems.map((problem, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-all">
                          <input type="checkbox" checked={problem.solved} onChange={() => toggleProblemSolved(challenge.id, idx)} className="w-5 h-5 accent-purple-500 cursor-pointer" />
                          <span className={`flex-1 ${problem.solved ? 'line-through text-gray-500' : 'text-white'}`}>
                            {problem.title}
                          </span>
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {problem.difficulty}
                          </span>
                          {problem.link && (
                            <a href={problem.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                              <Icons.Link2 />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      {!challenge.solutionsSubmitted && (
                        <>
                          <button onClick={() => submitSolutions(challenge.id)} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105">
                            <Icons.CheckCircle /> Submit Solutions
                          </button>
                          <button onClick={() => markAsFailed(challenge.id)} className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-rose-700 font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105">
                            <Icons.XCircle /> Mark as Failed
                          </button>
                        </>
                      )}
                      {challenge.solutionsSubmitted && (
                        <div className="text-green-400 flex items-center gap-2 font-semibold">
                          <Icons.CheckCircle /> Solutions Submitted
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const SubmitView = () => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 border border-gray-700">
      <h3 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
        <Icons.Plus /> Submit Your 6 Problems
      </h3>
      
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-3 text-gray-300">Select Member</label>
        <select value={currentUser} onChange={(e) => setCurrentUser(e.target.value)} className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all">
          <option value="">Choose member...</option>
          {members.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-8 p-6 bg-gray-700/30 rounded-xl border border-gray-600">
        <h4 className="font-bold text-xl mb-4 text-white flex items-center justify-between">
          <span>Add Problem</span>
          <span className="text-purple-400">({problemsList.length}/6)</span>
        </h4>
        <div className="space-y-4">
          <input type="text" placeholder="Problem Title *" value={newProblem.title} onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })} className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
          <input type="text" placeholder="Problem Link (optional)" value={newProblem.link} onChange={(e) => setNewProblem({ ...newProblem, link: e.target.value })} className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
          <select value={newProblem.difficulty} onChange={(e) => setNewProblem({ ...newProblem, difficulty: e.target.value })} className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <button onClick={addProblemToList} disabled={problemsList.length >= 6} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 disabled:transform-none">
            <Icons.Plus /> Add to List
          </button>
        </div>
      </div>

      {problemsList.length > 0 && (
        <div className="mb-8">
          <h4 className="font-bold text-xl mb-4 text-white">Problems to Submit:</h4>
          <div className="space-y-3">
            {problemsList.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600 hover:bg-gray-700 transition-all">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-purple-400 font-bold text-lg">{idx + 1}.</span>
                  <div>
                    <span className="font-semibold text-white block">{p.title}</span>
                    {p.link && <span className="text-xs text-gray-400">{p.link}</span>}
                  </div>
                  <span className={`ml-auto text-xs px-3 py-1 rounded-full font-semibold ${
                    p.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    p.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {p.difficulty}
                  </span>
                </div>
                <button onClick={() => removeProblem(idx)} className="ml-4 text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-lg">
                  <Icons.Trash2 />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={addProblems} disabled={problemsList.length !== 6 || !currentUser} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-5 rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed font-bold text-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg">
        <Icons.CheckCircle /> Submit All Problems
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 mb-8 border border-purple-500">
          <h1 className="text-5xl font-bold text-white mb-3 flex items-center gap-4">
            <Icons.Award /> DSA Challenge Tracker
          </h1>
          <p className="text-purple-100 text-lg">6 problems daily challenge | ₹50 penalty per member for failure</p>
        </div>

        <div className="flex gap-4 mb-8">
          <button onClick={() => setView('dashboard')} className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${view === 'dashboard' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'}`}>
            <div className="flex items-center gap-2">
              <Icons.TrendingUp /> Dashboard
            </div>
          </button>
          <button onClick={() => setView('submit')} className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${view === 'submit' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'}`}>
            <div className="flex items-center gap-2">
              <Icons.Plus /> Submit Problems
            </div>
          </button>
        </div>

        {view === 'dashboard' ? <DashboardView /> : <SubmitView />}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DSATracker />);
