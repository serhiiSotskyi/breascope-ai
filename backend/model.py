import torch
import torch.nn as nn

class BreastCNN(nn.Module):
    def __init__(self, dropout: float = 0.3):
        super().__init__()

        self.conv = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=3),
            nn.ReLU(),
            nn.Dropout(dropout)
        )

        self.fc = nn.Sequential(
            nn.Linear(16 * 4 * 3, 32),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(32, 2)
        )

    def forward(self, x):
        x = x.view(-1, 1, 6, 5)
        x = self.conv(x)
        x = x.view(x.size(0), -1)
        x = self.fc(x)
        return x


def load_model(path: str):
    model = BreastCNN()
    state = torch.load(path, map_location="cpu")
    model.load_state_dict(state)
    model.eval()
    return model