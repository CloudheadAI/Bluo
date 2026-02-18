import { ProfileCard } from '../components/profile/ProfileCard';
import { AchievementsList } from '../components/gamification/Gamification';

export function ProfilePage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <ProfileCard />
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Achievements</h2>
        <AchievementsList />
      </div>
    </div>
  );
}
