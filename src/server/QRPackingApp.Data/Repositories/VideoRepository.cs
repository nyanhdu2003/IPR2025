using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QRPackingApp.Data.Repositories.IRepository;
using QRPackingApp.Model;

namespace QRPackingApp.Data.Repositories;

public class VideoRepository : IVideoRepository
{
    private readonly QRPackingAppDbContext _context;
    private readonly ILogger<VideoRepository> _logger;

    public VideoRepository(QRPackingAppDbContext context, ILogger<VideoRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Video?> GetByIdAsync(Guid id)
    {
        try
        {
            return await _context.Videos
                .Include(v => v.User)
                .Include(v => v.Product)
                .FirstOrDefaultAsync(v => v.Id == id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching video by ID");
            throw;
        }
    }

    public async Task DeleteAsync(Video video)
    {
        try
        {
            _context.Videos.Remove(video);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting video");
            throw;
        }
    }

    public async Task AddAsync(Video video)
    {
        await _context.Videos.AddAsync(video);
        await _context.SaveChangesAsync();
    }
}
