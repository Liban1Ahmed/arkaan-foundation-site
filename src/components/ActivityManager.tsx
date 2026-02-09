import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Activity } from "@/hooks/useActivities";
import {
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  ImageIcon,
  X,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

interface ActivityManagerProps {
  activities: Activity[];
  onAdd: (activity: Omit<Activity, "id" | "createdAt">) => void;
  onUpdate: (id: string, updates: Partial<Activity>) => void;
  onDelete: (id: string) => void;
  onReset: () => void;
}

const emptyActivity = {
  title: "",
  description: "",
  schedule: "",
  time: "",
  location: "",
  category: "Weekly",
  poster: "",
  featured: false,
};

export function ActivityManager({
  activities,
  onAdd,
  onUpdate,
  onDelete,
  onReset,
}: ActivityManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState(emptyActivity);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData((prev) => ({ ...prev, poster: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingActivity) {
      onUpdate(editingActivity.id, formData);
      toast.success("Activity updated successfully!");
    } else {
      onAdd(formData);
      toast.success("Activity added successfully!");
    }

    resetForm();
    setIsOpen(false);
  };

  const resetForm = () => {
    setFormData(emptyActivity);
    setPreviewImage(null);
    setEditingActivity(null);
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData({
      title: activity.title,
      description: activity.description,
      schedule: activity.schedule,
      time: activity.time,
      location: activity.location,
      category: activity.category,
      poster: activity.poster || "",
      featured: activity.featured,
    });
    setPreviewImage(activity.poster || null);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      onDelete(id);
      toast.success("Activity deleted successfully!");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Weekly: "bg-blue-500",
      Special: "bg-amber-500",
      Seasonal: "bg-emerald-500",
      Annual: "bg-purple-500",
      Monthly: "bg-rose-500",
      Other: "bg-gray-500",
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Manage Activities</h3>
        <div className="flex gap-2">
          <Dialog
            open={isOpen}
            onOpenChange={(open) => {
              setIsOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingActivity ? "Edit Activity" : "Add New Activity"}
                </DialogTitle>
                <DialogDescription>
                  {editingActivity
                    ? "Update the activity details below."
                    : "Fill in the details to add a new activity."}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {/* Poster Upload */}
                <div className="space-y-2">
                  <Label>Activity Poster (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    {previewImage ? (
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => {
                            setPreviewImage(null);
                            setFormData((prev) => ({ ...prev, poster: "" }));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer py-8"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload poster image
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Max 5MB
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Youth Nights"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the activity..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule">Schedule</Label>
                    <Input
                      id="schedule"
                      placeholder="e.g., Every Saturday"
                      value={formData.schedule}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          schedule: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      placeholder="e.g., 6:00 PM - 9:00 PM"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, time: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Masjid Salaam"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Special">Special</option>
                    <option value="Seasonal">Seasonal</option>
                    <option value="Annual">Annual</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, featured: checked }))
                    }
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Feature this activity (show in main section)
                  </Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      resetForm();
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingActivity ? "Update" : "Add"} Activity
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onReset}>
                Reset to Default
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-2">
        {activities.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No activities yet. Add your first activity!
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              {activity.poster ? (
                <img
                  src={activity.poster}
                  alt={activity.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : (
                <div
                  className={`w-16 h-16 rounded-lg ${getCategoryColor(
                    activity.category
                  )} bg-opacity-20 flex items-center justify-center`}
                >
                  <span className="text-2xl font-bold text-muted-foreground">
                    {activity.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium truncate">{activity.title}</h4>
                  {activity.featured && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.schedule} • {activity.category}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(activity)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
