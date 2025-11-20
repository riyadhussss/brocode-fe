import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NotesSectionProps {
  serviceNotes: string;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function NotesSection({
  serviceNotes,
  onInputChange,
}: NotesSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Catatan</h3>
      <div className="space-y-2">
        <Label htmlFor="serviceNotes">Catatan Tambahan (Opsional)</Label>
        <Textarea
          id="serviceNotes"
          name="serviceNotes"
          placeholder="Tambahkan catatan jika ada permintaan khusus"
          value={serviceNotes}
          onChange={onInputChange}
          rows={4}
        />
      </div>
    </div>
  );
}
