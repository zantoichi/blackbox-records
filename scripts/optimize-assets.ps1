param(
    [string]$ImageRoot = "assets/images",
    [int]$JpegQuality = 82,
    [int]$PngCompressionLevel = 9
)

$errorActionPreference = "Stop"
$optimizedTempDirectory = Join-Path $ImageRoot ".optimized"

if (-not (Test-Path $ImageRoot))
{
    Write-Error "Image root not found: $ImageRoot"
    exit 1
}

New-Item -ItemType Directory -Force $optimizedTempDirectory | Out-Null

$imageFiles = Get-ChildItem -Recurse -File $ImageRoot -Include *.jpg, *.jpeg, *.png |
    Where-Object { $_.FullName -notmatch "\\.optimized\\" -and $_.FullName -notmatch "\\.opt-" }

foreach ($imageFile in $imageFiles)
{
    $sharpArguments = @("-i", $imageFile.FullName, "-o", $optimizedTempDirectory)

    if ($imageFile.Extension -match "\.jpe?g")
    {
        $sharpArguments += @("--quality", $JpegQuality, "--mozjpeg")
    }
    elseif ($imageFile.Extension -eq ".png")
    {
        $sharpArguments += @("--compressionLevel", $PngCompressionLevel, "--adaptiveFiltering")
        if ($imageFile.FullName -match "\\assets\\images\\brand\\")
        {
            $sharpArguments += @("--palette")
        }
    }

    npx --yes sharp-cli @sharpArguments | Out-Null

    $optimizedPath = Join-Path $optimizedTempDirectory $imageFile.Name
    if (Test-Path $optimizedPath)
    {
        Move-Item -Force $optimizedPath $imageFile.FullName
    }
    else
    {
        Write-Warning "Optimized file missing for $( $imageFile.FullName )"
    }
}

Remove-Item -Recurse -Force $optimizedTempDirectory
Write-Output "Optimized $( $imageFiles.Count ) image(s)."
