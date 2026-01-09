import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Activity, 
  MessageSquare, 
  FileText, 
  Bookmark,
  Calendar,
  TrendingUp,
  Clock,
  LogOut,
  Settings,
  Loader2,
  ChevronRight,
  Trash2,
  Leaf
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface SymptomCheck {
  id: string;
  symptoms: string[];
  urgency_level: string;
  created_at: string;
  analysis_result: Record<string, unknown> | null;
}

interface ChatSession {
  id: string;
  title: string | null;
  messages: unknown[];
  created_at: string;
  updated_at: string;
}

interface PrescriptionScan {
  id: string;
  scan_result: Record<string, unknown> | null;
  notes: string | null;
  created_at: string;
}

interface BookmarkedArticle {
  id: string;
  article_id: string;
  article_title: string;
  category: string | null;
  created_at: string;
}

interface BookmarkedLeaf {
  id: string;
  leaf_id: string;
  leaf_name: string;
  created_at: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile, isLoading, signOut, updateProfile } = useAuth();
  const { toast } = useToast();

  const [symptomChecks, setSymptomChecks] = useState<SymptomCheck[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [prescriptionScans, setPrescriptionScans] = useState<PrescriptionScan[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);
  const [bookmarkedLeaves, setBookmarkedLeaves] = useState<BookmarkedLeaf[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  // Fetch user data
  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    setIsLoadingData(true);
    try {
      const [symptomsRes, chatsRes, scansRes, bookmarksRes, leavesRes] = await Promise.all([
        supabase
          .from("symptom_checks")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("chat_sessions")
          .select("*")
          .order("updated_at", { ascending: false })
          .limit(10),
        supabase
          .from("prescription_scans")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("bookmarked_articles")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20),
        supabase
          .from("bookmarked_leaves")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20),
      ]);

      if (symptomsRes.data) setSymptomChecks(symptomsRes.data as unknown as SymptomCheck[]);
      if (chatsRes.data) setChatSessions(chatsRes.data as unknown as ChatSession[]);
      if (scansRes.data) setPrescriptionScans(scansRes.data as unknown as PrescriptionScan[]);
      if (bookmarksRes.data) setBookmarks(bookmarksRes.data as unknown as BookmarkedArticle[]);
      if (leavesRes.data) setBookmarkedLeaves(leavesRes.data as unknown as BookmarkedLeaf[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const deleteSymptomCheck = async (id: string) => {
    const { error } = await supabase.from("symptom_checks").delete().eq("id", id);
    if (!error) {
      setSymptomChecks((prev) => prev.filter((s) => s.id !== id));
      toast({ title: "Deleted", description: "Symptom check removed from history." });
    }
  };

  const deleteChatSession = async (id: string) => {
    const { error } = await supabase.from("chat_sessions").delete().eq("id", id);
    if (!error) {
      setChatSessions((prev) => prev.filter((c) => c.id !== id));
      toast({ title: "Deleted", description: "Chat session removed from history." });
    }
  };

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase.from("bookmarked_articles").delete().eq("id", id);
    if (!error) {
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
      toast({ title: "Removed", description: "Article removed from bookmarks." });
    }
  };

  const deleteBookmarkedLeaf = async (id: string) => {
    const { error } = await supabase.from("bookmarked_leaves").delete().eq("id", id);
    if (!error) {
      setBookmarkedLeaves((prev) => prev.filter((b) => b.id !== id));
      toast({ title: "Removed", description: "Medicinal leaf removed from bookmarks." });
    }
  };

  const urgencyColors: Record<string, string> = {
    green: "bg-health-green-light text-health-green",
    yellow: "bg-health-amber-light text-health-amber",
    red: "bg-health-red-light text-health-red",
  };

  if (isLoading || !user) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">
                Welcome, {profile?.full_name || "User"}
              </h1>
              <p className="text-muted-foreground">
                Track your health journey and access personalized guidance.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSignOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{symptomChecks.length}</p>
                  <p className="text-xs text-muted-foreground">Symptom Checks</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-health-blue-light flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-health-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{chatSessions.length}</p>
                  <p className="text-xs text-muted-foreground">Chat Sessions</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-health-green-light flex items-center justify-center">
                  <FileText className="w-5 h-5 text-health-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{prescriptionScans.length}</p>
                  <p className="text-xs text-muted-foreground">Prescriptions</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-health-amber-light flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-health-amber" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{bookmarks.length}</p>
                  <p className="text-xs text-muted-foreground">Saved Articles</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-health-green-light flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-health-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{bookmarkedLeaves.length}</p>
                  <p className="text-xs text-muted-foreground">Saved Leaves</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="symptoms" className="space-y-6">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="symptoms" className="gap-2">
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Symptoms</span>
              </TabsTrigger>
              <TabsTrigger value="chats" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Chats</span>
              </TabsTrigger>
              <TabsTrigger value="prescriptions" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Rx</span>
              </TabsTrigger>
              <TabsTrigger value="bookmarks" className="gap-2">
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">Articles</span>
              </TabsTrigger>
              <TabsTrigger value="leaves" className="gap-2">
                <Leaf className="w-4 h-4" />
                <span className="hidden sm:inline">Leaves</span>
              </TabsTrigger>
            </TabsList>

            {/* Symptom Checks Tab */}
            <TabsContent value="symptoms">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Symptom Check History</CardTitle>
                  <Button asChild size="sm">
                    <Link to="/symptoms">New Check</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingData ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : symptomChecks.length === 0 ? (
                    <div className="text-center py-8">
                      <Activity className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground mb-4">No symptom checks yet</p>
                      <Button asChild>
                        <Link to="/symptoms">Check Your Symptoms</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {symptomChecks.map((check) => (
                        <div
                          key={check.id}
                          className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${urgencyColors[check.urgency_level] || urgencyColors.green}`}>
                                  {check.urgency_level.toUpperCase()}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {format(new Date(check.created_at), "MMM d, yyyy 'at' h:mm a")}
                                </span>
                              </div>
                              <p className="font-medium mb-1">{(check.analysis_result as Record<string, unknown>)?.title as string || "Symptom Analysis"}</p>
                              <p className="text-sm text-muted-foreground">
                                Symptoms: {check.symptoms.join(", ")}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteSymptomCheck(check.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chat Sessions Tab */}
            <TabsContent value="chats">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Chat History</CardTitle>
                  <Button asChild size="sm">
                    <Link to="/chat">New Chat</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingData ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : chatSessions.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground mb-4">No chat sessions yet</p>
                      <Button asChild>
                        <Link to="/chat">Start a Conversation</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {chatSessions.map((session) => (
                        <div
                          key={session.id}
                          className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {format(new Date(session.updated_at), "MMM d, yyyy")}
                                </span>
                              </div>
                              <p className="font-medium mb-1">
                                {session.title || "Health Conversation"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {session.messages.length} messages
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteChatSession(session.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Prescription Scans Tab */}
            <TabsContent value="prescriptions">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Prescription History</CardTitle>
                  <Button asChild size="sm">
                    <Link to="/scanner">Scan New</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingData ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : prescriptionScans.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground mb-4">No prescription scans yet</p>
                      <Button asChild>
                        <Link to="/scanner">Scan a Prescription</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {prescriptionScans.map((scan) => (
                        <div
                          key={scan.id}
                          className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {format(new Date(scan.created_at), "MMM d, yyyy")}
                                </span>
                              </div>
                              <p className="font-medium mb-1">
                                {((scan.scan_result as Record<string, unknown>)?.medications as unknown[])?.length || 0} Medications
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {((scan.scan_result as Record<string, unknown>)?.medications as { name: string }[])?.map((m) => m.name).join(", ") || "No medications found"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookmarks Tab */}
            <TabsContent value="bookmarks">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Saved Articles</CardTitle>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/library">Browse Library</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingData ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : bookmarks.length === 0 ? (
                    <div className="text-center py-8">
                      <Bookmark className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground mb-4">No saved articles yet</p>
                      <Button asChild>
                        <Link to="/library">Explore Health Library</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {bookmarks.map((bookmark) => (
                        <div
                          key={bookmark.id}
                          className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium mb-1">{bookmark.article_title}</p>
                              {bookmark.category && (
                                <span className="text-xs text-muted-foreground">{bookmark.category}</span>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteBookmark(bookmark.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookmarked Leaves Tab */}
            <TabsContent value="leaves">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Saved Medicinal Leaves</CardTitle>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/library">Browse Library</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingData ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : bookmarkedLeaves.length === 0 ? (
                    <div className="text-center py-8">
                      <Leaf className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground mb-4">No saved medicinal leaves yet</p>
                      <Button asChild>
                        <Link to="/library">Explore Medicinal Leaves</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {bookmarkedLeaves.map((leaf) => (
                        <div
                          key={leaf.id}
                          className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-health-green-light flex items-center justify-center">
                                <Leaf className="w-5 h-5 text-health-green" />
                              </div>
                              <div>
                                <p className="font-medium">{leaf.leaf_name}</p>
                                <span className="text-xs text-muted-foreground">
                                  {format(new Date(leaf.created_at), "MMM d, yyyy")}
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteBookmarkedLeaf(leaf.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Layout>
  );
}
