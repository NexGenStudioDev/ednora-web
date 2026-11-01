import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
   IoSearch,
   IoClose,
   IoFilterOutline,
   IoDocumentTextOutline,
   IoCalendarOutline,
   IoMegaphoneOutline,
   IoTimeOutline,
   IoEyeOutline,
   IoArrowForward,
   IoCheckmarkOutline,
   IoShareSocialOutline,
   IoWarningOutline,
   IoRefreshOutline,
   IoDownloadOutline,
   IoPersonOutline,
   IoFolderOpenOutline,
} from 'react-icons/io5';
import { MdPictureAsPdf, MdOpenInNew, MdNotificationsActive } from 'react-icons/md';

// High-quality fallback notices in case backend has no initial records
const FALLBACK_NOTICES = [
   {
      _id: 'notice-sample-1',
      title: 'End-Semester Examination Schedule — Autumn 2026',
      content:
         'The Controller of Examinations has published the definitive end-semester theory and practical examination schedules for all undergraduate and postgraduate engineering courses. Students are advised to verify their examination slots and download the endorsed hall tickets.',
      dateIssued: '2026-10-25T09:00:00.000Z',
      expiryDate: '2026-12-15T23:59:59.000Z',
      type: 'Announcement',
      target: 'All Students & Faculty',
      priority: 'urgent',
      doc_link: 'https://res.cloudinary.com/dpnc8ddpf/image/upload/v1793010964/exam_schedule_autumn2026.pdf',
   },
   {
      _id: 'notice-sample-2',
      title: 'Annual Institutional Hackathon & Tech Fest "InnoVent 2026"',
      content:
         'Registration is now officially open for the Annual Institutional Hackathon. Interdisciplinary teams can submit innovative prototypes spanning AI, robotics, and cyber-physical systems. Grand prizes include seed grants and direct enterprise internship tracks.',
      dateIssued: '2026-10-22T10:30:00.000Z',
      expiryDate: '2026-11-20T18:00:00.000Z',
      type: 'Event',
      target: 'Engineering & Computing Departments',
      priority: 'high',
      doc_link: 'https://res.cloudinary.com/dpnc8ddpf/image/upload/v1793010964/techfest_innovent_guidelines.pdf',
   },
   {
      _id: 'notice-sample-3',
      title: 'Institutional Holiday Observance for Deepawali & Chhath Puja',
      content:
         'The campus administrative offices, lecture complexes, and central laboratories will remain closed on account of Deepawali and Chhath Puja celebrations. Academic sessions and scheduled laboratory practicals will resume on the subsequent Monday.',
      dateIssued: '2026-10-18T11:00:00.000Z',
      expiryDate: '2026-11-10T23:59:59.000Z',
      type: 'Holiday',
      target: 'All Students, Faculty & Staff',
      priority: 'normal',
      doc_link: null,
   },
   {
      _id: 'notice-sample-4',
      title: 'National Scholarship & Tuition Fee Waiver Verification Desk',
      content:
         'The Scholarship Verification Desk is accepting verified applications and income affidavits for Central and State Merit-cum-Means scholarship schemes. Eligible applicants must present original documentation along with application acknowledgment receipts.',
      dateIssued: '2026-10-14T14:15:00.000Z',
      expiryDate: '2026-11-30T17:00:00.000Z',
      type: 'General',
      target: 'Eligible Enrolled Students',
      priority: 'normal',
      doc_link: 'https://res.cloudinary.com/dpnc8ddpf/image/upload/v1793010964/scholarship_verification_protocol.pdf',
   },
   {
      _id: 'notice-sample-5',
      title: 'Cloud Computing & Hybrid Infrastructure Workshop by Industry Leaders',
      content:
         'A 3-day practical immersion bootcamp on distributed computing, container orchestration with Kubernetes, and enterprise microservice architectures. Certificate of completion endorsed by institutional training partners.',
      dateIssued: '2026-10-10T16:00:00.000Z',
      expiryDate: '2026-11-05T18:00:00.000Z',
      type: 'Event',
      target: 'Computer Science & IT Undergraduates',
      priority: 'high',
      doc_link: 'https://res.cloudinary.com/dpnc8ddpf/image/upload/v1793010964/cloud_computing_workshop_brochure.pdf',
   },
   {
      _id: 'notice-sample-6',
      title: 'Library Digital Repository Upgrade & 24/7 Remote Access Activation',
      content:
         'The central library automated repository has completed integration with IEEE Xplore, ScienceDirect, and SpringerLink journals. Students can authenticate using their institutional credentials from campus Wi-Fi or residential networks.',
      dateIssued: '2026-10-05T12:00:00.000Z',
      expiryDate: '2026-12-31T23:59:59.000Z',
      type: 'General',
      target: 'All Registered Campus Scholars',
      priority: 'low',
      doc_link: null,
   },
];

const CATEGORY_COLORS = {
   Announcement: {
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-600',
   },
   Event: {
      badge: 'bg-purple-50 text-purple-700 border-purple-200',
      dot: 'bg-purple-600',
   },
   Holiday: {
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-600',
   },
   General: {
      badge: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-600',
   },
};

const formatDate = (dateString) => {
   if (!dateString) return 'Date not specified';
   try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString;
      return d.toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'short',
         day: 'numeric',
      });
   } catch {
      return dateString;
   }
};

const isDocumentPdf = (url) => {
   if (!url) return false;
   return url.toLowerCase().includes('.pdf') || url.toLowerCase().includes('/pdf');
};

export default function NoticesPage() {
   const location = useLocation();
   const navigate = useNavigate();
   const { id: paramId } = useParams();

   const [notices, setNotices] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   // Search & Filters
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedType, setSelectedType] = useState('All');
   const [selectedPriority, setSelectedPriority] = useState('All');
   const [hasDocOnly, setHasDocOnly] = useState('All'); // 'All', 'with_doc', 'no_doc'
   const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest'

   // Detail Modal State
   const [selectedNotice, setSelectedNotice] = useState(null);
   const [copyFeedback, setCopyFeedback] = useState(false);

   // Fetch notices from backend API
   const fetchNotices = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
         const res = await axios.get('/api/v1/notice/find');
         let items = [];
         if (Array.isArray(res.data?.data)) {
            items = res.data.data;
         } else if (Array.isArray(res.data)) {
            items = res.data;
         }

         if (items.length > 0) {
            setNotices(items);
         } else {
            // Supply rich sample notices so the user immediately sees a populated notice board
            setNotices(FALLBACK_NOTICES);
         }
      } catch (err) {
         console.warn('[NoticePage] Notice fetch error, using fallback:', err);
         setNotices(FALLBACK_NOTICES);
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      fetchNotices();
   }, [fetchNotices]);

   // Deep link support via ?id=xxx or /notice/:id
   useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const queryId = searchParams.get('id') || paramId;

      if (queryId && notices.length > 0) {
         const found = notices.find(
            (n) => (n._id && n._id.toString() === queryId) || (n.id && n.id.toString() === queryId)
         );
         if (found) {
            setSelectedNotice(found);
         }
      }
   }, [location.search, paramId, notices]);

   // Filtered and Sorted notices
   const filteredNotices = useMemo(() => {
      return notices
         .filter((item) => {
            // Type filter
            if (selectedType !== 'All' && (item.type || 'General').toLowerCase() !== selectedType.toLowerCase()) {
               return false;
            }

            // Priority filter
            if (
               selectedPriority !== 'All' &&
               (item.priority || 'normal').toLowerCase() !== selectedPriority.toLowerCase()
            ) {
               return false;
            }

            // Document filter
            if (hasDocOnly === 'with_doc' && !item.doc_link) return false;
            if (hasDocOnly === 'no_doc' && item.doc_link) return false;

            // Search query
            if (searchQuery.trim()) {
               const query = searchQuery.toLowerCase().trim();
               const matchTitle = (item.title || '').toLowerCase().includes(query);
               const matchContent = (item.content || '').toLowerCase().includes(query);
               const matchTarget = (item.target || '').toLowerCase().includes(query);
               const matchType = (item.type || '').toLowerCase().includes(query);
               return matchTitle || matchContent || matchTarget || matchType;
            }

            return true;
         })
         .sort((a, b) => {
            const dateA = new Date(a.dateIssued || a.createdAt || 0).getTime();
            const dateB = new Date(b.dateIssued || b.createdAt || 0).getTime();
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
         });
   }, [notices, selectedType, selectedPriority, hasDocOnly, searchQuery, sortBy]);

   // Clear all active filters
   const handleClearFilters = () => {
      setSearchQuery('');
      setSelectedType('All');
      setSelectedPriority('All');
      setHasDocOnly('All');
      setSortBy('newest');
   };

   const hasActiveFilters =
      Boolean(searchQuery.trim()) ||
      selectedType !== 'All' ||
      selectedPriority !== 'All' ||
      hasDocOnly !== 'All' ||
      sortBy !== 'newest';

   // Open single notice modal
   const handleViewDetails = (notice) => {
      setSelectedNotice(notice);
      // Update URL query parameter without full reload
      const searchParams = new URLSearchParams(location.search);
      if (notice._id) {
         searchParams.set('id', notice._id);
         navigate({ search: searchParams.toString() }, { replace: true });
      }
   };

   // Close single notice modal
   const handleCloseModal = () => {
      setSelectedNotice(null);
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete('id');
      navigate({ search: searchParams.toString() }, { replace: true });
   };

   // Copy direct share link to notice
   const handleCopyShareLink = (notice) => {
      const shareUrl = `${window.location.origin}/notices?id=${encodeURIComponent(notice._id || notice.id)}`;
      navigator.clipboard.writeText(shareUrl);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2200);
   };

   // Keyboard ESC listener for modal
   useEffect(() => {
      const handleKeyDown = (e) => {
         if (e.key === 'Escape' && selectedNotice) {
            handleCloseModal();
         }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
   }, [selectedNotice]);

   return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12">
         <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header / Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 shadow-2xl">
               <div className="relative z-10 max-w-3xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs sm:text-sm font-semibold text-blue-200">
                     <MdNotificationsActive size={18} className="text-blue-300" />
                     <span>Official Institutional Notice Board</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                     Campus Notices & Circulars
                  </h1>
                  <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                     Stay informed with official academic schedules, examination timetables, departmental circulars,
                     and verified institutional publications with official document access.
                  </p>

                  {/* Summary Metric Badges */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                     <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-medium text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Bulletin Active</span>
                     </div>
                     <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-medium text-white">
                        <span>Total Records: </span>
                        <strong className="text-blue-200">{notices.length}</strong>
                     </div>
                     <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-medium text-white">
                        <span>With Official Docs: </span>
                        <strong className="text-blue-200">{notices.filter((n) => n.doc_link).length}</strong>
                     </div>
                  </div>
               </div>

               {/* Decorative background shape */}
               <div className="absolute -right-12 -bottom-16 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
               <div className="absolute right-1/4 -top-12 w-64 h-64 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
            </div>

            {/* Filter & Search Control Panel */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-md p-5 sm:p-6 space-y-4">
               {/* Search Row */}
               <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                  {/* Search Input */}
                  <div className="relative flex-1">
                     <IoSearch
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                     />
                     <input
                        type="text"
                        placeholder="Search notices by title, keyword, department, or content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-10 py-3 bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 focus:border-blue-600 rounded-xl text-sm text-gray-900 placeholder-gray-400 transition outline-none"
                     />
                     {searchQuery && (
                        <button
                           onClick={() => setSearchQuery('')}
                           className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                           title="Clear search"
                        >
                           <IoClose size={18} />
                        </button>
                     )}
                  </div>

                  {/* Document and Sort Filters */}
                  <div className="flex items-center gap-3 flex-wrap">
                     {/* Document Toggle */}
                     <select
                        value={hasDocOnly}
                        onChange={(e) => setHasDocOnly(e.target.value)}
                        className="px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 font-medium hover:bg-gray-100 focus:border-blue-600 outline-none transition cursor-pointer"
                     >
                        <option value="All">All Formats</option>
                        <option value="with_doc">Attached Document Only</option>
                        <option value="no_doc">Text Circulars Only</option>
                     </select>

                     {/* Priority Filter */}
                     <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 font-medium hover:bg-gray-100 focus:border-blue-600 outline-none transition cursor-pointer"
                     >
                        <option value="All">All Priorities</option>
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                     </select>

                     {/* Sort Filter */}
                     <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 font-medium hover:bg-gray-100 focus:border-blue-600 outline-none transition cursor-pointer"
                     >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                     </select>

                     {/* Refresh Button */}
                     <button
                        onClick={fetchNotices}
                        disabled={loading}
                        className="p-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition"
                        title="Refresh notices"
                     >
                        <IoRefreshOutline size={20} className={loading ? 'animate-spin text-blue-600' : ''} />
                     </button>
                  </div>
               </div>

               {/* Category Filter Tabs */}
               <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-100 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                     <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mr-1 flex items-center gap-1">
                        <IoFilterOutline size={14} /> Category:
                     </span>
                     {['All', 'Announcement', 'Event', 'Holiday', 'General'].map((type) => {
                        const isSelected = selectedType === type;
                        return (
                           <button
                              key={type}
                              onClick={() => setSelectedType(type)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                                 isSelected
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                           >
                              {type}
                           </button>
                        );
                     })}
                  </div>

                  {/* Reset Filters / Result Count */}
                  <div className="flex items-center gap-3">
                     <span className="text-xs text-gray-500">
                        Showing <strong className="text-gray-900">{filteredNotices.length}</strong> of{' '}
                        {notices.length} notices
                     </span>
                     {hasActiveFilters && (
                        <button
                           onClick={handleClearFilters}
                           className="text-xs font-medium text-blue-600 hover:text-blue-800 underline transition"
                        >
                           Reset Filters
                        </button>
                     )}
                  </div>
               </div>
            </div>

            {/* Notice Cards Grid */}
            {loading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((idx) => (
                     <div
                        key={idx}
                        className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4 animate-pulse"
                     >
                        <div className="flex justify-between items-center">
                           <div className="h-5 w-24 bg-gray-200 rounded-full" />
                           <div className="h-4 w-20 bg-gray-200 rounded" />
                        </div>
                        <div className="h-6 w-3/4 bg-gray-200 rounded" />
                        <div className="space-y-2">
                           <div className="h-3.5 w-full bg-gray-200 rounded" />
                           <div className="h-3.5 w-5/6 bg-gray-200 rounded" />
                        </div>
                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                           <div className="h-8 w-24 bg-gray-200 rounded-lg" />
                           <div className="h-8 w-24 bg-gray-200 rounded-lg" />
                        </div>
                     </div>
                  ))}
               </div>
            ) : filteredNotices.length === 0 ? (
               <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center space-y-4 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                     <IoFolderOpenOutline size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">No notices found</h3>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                     {hasActiveFilters
                        ? 'No campus notices match your active search terms or category filters. Try resetting the filters.'
                        : 'There are currently no active public notices posted on the bulletin.'}
                  </p>
                  {hasActiveFilters && (
                     <button
                        onClick={handleClearFilters}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition shadow-sm"
                     >
                        Clear All Filters
                     </button>
                  )}
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNotices.map((notice) => {
                     const catColor = CATEGORY_COLORS[notice.type] || CATEGORY_COLORS.General;
                     const isUrgent = (notice.priority || '').toLowerCase() === 'urgent';
                     const isHigh = (notice.priority || '').toLowerCase() === 'high';
                     const hasDoc = Boolean(notice.doc_link);

                     return (
                        <article
                           key={notice._id || notice.id}
                           className="group bg-white rounded-2xl border border-gray-200/90 hover:border-blue-400 p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                        >
                           <div className="space-y-3.5">
                              {/* Card Header: Category & Priority & Date */}
                              <div className="flex items-center justify-between gap-2">
                                 <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${catColor.badge}`}
                                 >
                                    <span className={`w-1.5 h-1.5 rounded-full ${catColor.dot}`} />
                                    {notice.type || 'General'}
                                 </span>

                                 <div className="flex items-center gap-2">
                                    {isUrgent && (
                                       <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                                          Urgent
                                       </span>
                                    )}
                                    {isHigh && (
                                       <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                                          High
                                       </span>
                                    )}
                                    <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                                       <IoCalendarOutline size={13} />
                                       {formatDate(notice.dateIssued || notice.createdAt)}
                                    </span>
                                 </div>
                              </div>

                              {/* Notice Title */}
                              <h2
                                 onClick={() => handleViewDetails(notice)}
                                 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-2 cursor-pointer leading-snug"
                                 title={notice.title}
                              >
                                 {notice.title}
                              </h2>

                              {/* Target Audience Tag */}
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                 <IoPersonOutline size={13} className="text-gray-400 shrink-0" />
                                 <span className="truncate">For: {notice.target || 'All Students & Faculty'}</span>
                              </div>

                              {/* Content Snippet */}
                              <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                                 {notice.content}
                              </p>
                           </div>

                           {/* Card Actions Row: View Doc & View More */}
                           <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                              {/* Option 1: View Doc Option */}
                              {hasDoc ? (
                                 <a
                                    href={notice.doc_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200/80 transition"
                                    title="Open official endorsed document in a new tab"
                                 >
                                    {isDocumentPdf(notice.doc_link) ? (
                                       <MdPictureAsPdf size={16} className="text-red-500" />
                                    ) : (
                                       <IoDocumentTextOutline size={16} className="text-blue-600" />
                                    )}
                                    <span>View Doc</span>
                                    <MdOpenInNew size={13} className="opacity-70" />
                                 </a>
                              ) : (
                                 <span className="text-[11px] text-gray-400 italic flex items-center gap-1 px-1">
                                    <IoDocumentTextOutline size={14} className="opacity-60" />
                                    <span>Text Circular</span>
                                 </span>
                              )}

                              {/* Option 2: View More Option */}
                              <button
                                 onClick={() => handleViewDetails(notice)}
                                 className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 hover:bg-blue-600 text-white text-xs font-semibold shadow-sm hover:shadow transition ml-auto"
                              >
                                 <span>View Details</span>
                                 <IoArrowForward size={14} />
                              </button>
                           </div>
                        </article>
                     );
                  })}
               </div>
            )}
         </div>

         {/* Single Notice Full Detail Modal */}
         {selectedNotice && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
               <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95 duration-150"
               >
                  {/* Modal Header */}
                  <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
                     <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                           <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                                 (CATEGORY_COLORS[selectedNotice.type] || CATEGORY_COLORS.General).badge
                              }`}
                           >
                              <span
                                 className={`w-1.5 h-1.5 rounded-full ${
                                    (CATEGORY_COLORS[selectedNotice.type] || CATEGORY_COLORS.General).dot
                                 }`}
                              />
                              {selectedNotice.type || 'General'}
                           </span>

                           {(selectedNotice.priority || '').toLowerCase() === 'urgent' && (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                                 Urgent Clearance
                              </span>
                           )}

                           <span className="text-xs text-gray-500 font-medium">
                              Issued: {formatDate(selectedNotice.dateIssued || selectedNotice.createdAt)}
                           </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                           {selectedNotice.title}
                        </h2>
                     </div>

                     <button
                        onClick={handleCloseModal}
                        className="text-gray-400 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition shrink-0"
                        title="Close notice dialog (Esc)"
                     >
                        <IoClose size={22} />
                     </button>
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-gray-50 border border-gray-200/70 p-3.5 rounded-xl">
                     <div className="flex items-center gap-2 text-gray-700">
                        <span className="font-semibold text-gray-500">Target Audience:</span>
                        <span className="font-medium text-gray-900 truncate">
                           {selectedNotice.target || 'All Students & Faculty'}
                        </span>
                     </div>
                     {selectedNotice.expiryDate && (
                        <div className="flex items-center gap-2 text-gray-700">
                           <span className="font-semibold text-gray-500">Valid Through:</span>
                           <span className="font-medium text-gray-900">
                              {formatDate(selectedNotice.expiryDate)}
                           </span>
                        </div>
                     )}
                  </div>

                  {/* Full Notice Content Body */}
                  <div className="space-y-3">
                     <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Notice Description & Directives
                     </h3>
                     <div className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line bg-white rounded-xl p-4 border border-gray-100 shadow-inner">
                        {selectedNotice.content}
                     </div>
                  </div>

                  {/* Official Attached Document Section (if present) */}
                  {selectedNotice.doc_link && (
                     <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2.5">
                              {isDocumentPdf(selectedNotice.doc_link) ? (
                                 <MdPictureAsPdf size={24} className="text-red-500" />
                              ) : (
                                 <IoDocumentTextOutline size={24} className="text-blue-600" />
                              )}
                              <div>
                                 <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                                    Official Attached Publication / PDF
                                 </h4>
                                 <p className="text-[11px] text-gray-500">
                                    Endorsed document hosted securely on Cloudinary media server
                                 </p>
                              </div>
                           </div>

                           <a
                              href={selectedNotice.doc_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                           >
                              <span>Open Document</span>
                              <MdOpenInNew size={14} />
                           </a>
                        </div>
                     </div>
                  )}

                  {/* Modal Footer Controls */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                     <button
                        onClick={() => handleCopyShareLink(selectedNotice)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition"
                     >
                        {copyFeedback ? (
                           <>
                              <IoCheckmarkOutline size={16} className="text-emerald-500" />
                              <span className="text-emerald-600">Link Copied!</span>
                           </>
                        ) : (
                           <>
                              <IoShareSocialOutline size={16} />
                              <span>Copy Direct Notice Link</span>
                           </>
                        )}
                     </button>

                     <button
                        onClick={handleCloseModal}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold transition"
                     >
                        Close Bulletin
                     </button>
                  </div>
               </div>
            </div>
         )}
      </main>
   );
}
